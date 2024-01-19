import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        var transactions = await excuteQuery("SELECT address AS a, amount AS b, created_at AS c FROM withdraw ORDER BY created_at DESC LIMIT 10");
        
        return NextResponse.json({ success: true, message: transactions}, {status: 200});

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }
}


// withdraw from balance 
export async function POST(NextRequest) {
    try {
        var { walletAddress, amount} = await NextRequest.json();
        if (walletAddress) {
            try {
                var getUser = await excuteQuery(`SELECT id, total_deposit, is_referal_qualified, is_deposit_qualified FROM users WHERE address = '${walletAddress}' LIMIT 1`);
                var userId = 0; var balance = 0;
                var quaRef = 0; var quaDep = 0;
                if(getUser.length > 0) {
                    userId = getUser[0].id;
                    balance = getUser[0].total_deposit;
                    quaRef = getUser[0].is_referal_qualified;
                    quaDep = getUser[0].is_deposit_qualified;

                    if(amount > balance) {
                        return NextResponse.json({ success: false, message: 'Insufficient balance' }, {status: 400});
                    }
                }

                if(quaRef == 0) {
                    return NextResponse.json({ success: false, message: 'Your referal is not qualified' }, {status: 400});
                }

                if(quaDep == 0) {
                    return NextResponse.json({ success: false, message: 'Your contribution is not qualified' }, {status: 400});
                }

                if(userId > 0) {
                    var minWd = 0.0001;
                    if(amount >=minWd) {

                        if(amount > 1) {
                            return NextResponse.json({ success: false, message: 'max withdrawal 1BNB/day, increase your contribution to upgrade your withdrawal limit!' }, {status: 400});
                        }

                        await excuteQuery("INSERT INTO withdraw (address, amount, user_id) VALUES ('"+walletAddress+"', "+amount+", "+userId+")");
                        await excuteQuery('Update users SET total_deposit = total_deposit - '+amount+' WHERE id = '+userId);
                        return NextResponse.json({ success: true, message: "Succesful withdrawal "+amount+" to your address"}, {status: 200});
                   }
                   else{
                        return NextResponse.json({ success: false, message: 'min withdrawal '+minWd }, {status: 400});
                   }

                }
                else{
                    return NextResponse.json({ success: false, message: 'address not found' }, {status: 400});
                }
            } 
            catch (error) {
                console.log("error", error);
                return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
            }
        } 
        else {
            return NextResponse.json({ success: false, message: 'address is required' }, {status: 400});
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'bad request' }, {status: 500});
    }
}
