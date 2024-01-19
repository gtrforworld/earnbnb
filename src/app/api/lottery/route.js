import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
import { formatDistance, parseISO, differenceInSeconds, format } from 'date-fns';
export const dynamic = 'force-dynamic';

function generateRandomAmount(min, max, decimalPlaces) {
    const randomValue = Math.random() * (max - min) + min;  
    const roundedValue = Number(randomValue.toFixed(decimalPlaces));  
    return parseFloat(roundedValue.toFixed(decimalPlaces));
}

export async function POST(NextRequest) {
    try {
        var { walletAddress} = await NextRequest.json();
        if (walletAddress) {
            try {

                var getUser = await excuteQuery(`SELECT id, next_lottery_open FROM users WHERE address = '${walletAddress}' LIMIT 1`);
                var userId = 0; var lotteryOpen = null;
                if(getUser.length > 0) {
                    userId = getUser[0].id;
                    lotteryOpen = getUser[0].next_lottery_open;
                }

                if(userId > 0) {
                    var getAmountRandom = generateRandomAmount(0.001, 1, 6);
                    if(lotteryOpen == null) {
                        var currentDate = new Date();
                    } 
                    else{
                        var currentDate = new Date(lotteryOpen);
                        const currentDateNow = new Date();
                        const timeRemaining = differenceInSeconds(currentDate, currentDateNow);
                        if(timeRemaining > 0) {
                            return NextResponse.json({ success: false, message: "Lottery is Locked" }, {status: 400});
                        }
                    }
                    var currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + 1);
                    const nextOpenDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
                    var updateUser = await excuteQuery(`UPDATE users SET next_lottery_open = '${nextOpenDate}' WHERE id = ${userId}`);
                    
                    if(getAmountRandom > 0) {
                        var response = await excuteQuery(`INSERT INTO lottery_transactions (user_id, address, amount) VALUES ('${userId}', '${walletAddress}', '${getAmountRandom}')`);
                        var updateUser = await excuteQuery(`UPDATE users SET total_deposit = total_deposit + ${getAmountRandom} WHERE id = ${userId}`);
                        return NextResponse.json({ success: true, message: getAmountRandom }, {status: 200});
                    }
                    else{
                        return NextResponse.json({ success: true, message: 0 }, {status: 200});
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

export async function GET(request) {
    try {
        // Check if the user already exists in the database
        const datas = await excuteQuery(
            "SELECT lottery_transactions.address AS ad, lottery_transactions.amount AS a, lottery_transactions.created_at AS t "+
            "FROM lottery_transactions "+
            "ORDER BY lottery_transactions.created_at "+
            "DESC LIMIT 15");
        return NextResponse.json({ success: true, message: datas }, {status: 200});

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }
}