import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
import { formatDistance, parseISO, differenceInSeconds, format } from 'date-fns';
export const dynamic = 'force-dynamic';

function generateRandomAmount(min, max, decimalPlaces) {
    const randomValue = Math.random() * (max - min) + min;  
    const roundedValue = Number(randomValue.toFixed(decimalPlaces));  
    return parseFloat(roundedValue.toFixed(decimalPlaces));
}

// withdraw from bonus to balance 
export async function POST(NextRequest) {
    try {
        var { walletAddress} = await NextRequest.json();
        if (walletAddress) {
            try {

                var getUser = await excuteQuery(`SELECT id, bonus_now FROM users WHERE address = '${walletAddress}' LIMIT 1`);
                var userId = 0; var bonusUser = 0;
                if(getUser.length > 0) {
                    userId = getUser[0].id;
                    bonusUser = getUser[0].bonus_now;
                }

                if(userId > 0) {
                    var minWd = 0.0001;
                   if(bonusUser > minWd) {

                        if(bonusUser > 1) {
                            return NextResponse.json({ success: false, message: 'max withdrawal 1BNB/day, increase your contribution to upgrade your withdrawal limit!' }, {status: 400});
                        }

                        await excuteQuery('Update users SET total_deposit = total_deposit + '+bonusUser+', bonus_now = bonus_now - '+bonusUser+' WHERE id = '+userId);
                        return NextResponse.json({ success: true, message: "Succesful withdrawal "+bonusUser+" to your balance"}, {status: 200});
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
