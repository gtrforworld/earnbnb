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
        var { walletAddress, type} = await NextRequest.json();
        if (walletAddress) {
            try {
                var userId = 0; var lotteryOpen = null; var getPrize; var addDays;
                if(type == 'day') {
                    var getUser = await excuteQuery(`SELECT id, next_daily_bonus FROM users WHERE address = '${walletAddress}' LIMIT 1`);
                    if(getUser.length > 0) {
                        userId = getUser[0].id;
                        lotteryOpen = getUser[0].next_daily_bonus;
                    }
                    getPrize = 0.001;
                    addDays = 1;
                }

                if(type == 'week') {
                    var getUser = await excuteQuery(`SELECT id, next_week_bonus FROM users WHERE address = '${walletAddress}' LIMIT 1`);
                    if(getUser.length > 0) {
                        userId = getUser[0].id;
                        lotteryOpen = getUser[0].next_week_bonus;
                    }
                    getPrize = 0.005;
                    addDays = 7;
                }

                if(type == 'month') {
                    var getUser = await excuteQuery(`SELECT id, next_month_bonus FROM users WHERE address = '${walletAddress}' LIMIT 1`);
                    if(getUser.length > 0) {
                        userId = getUser[0].id;
                        lotteryOpen = getUser[0].next_month_bonus;
                    }
                    getPrize = 0.025;
                    addDays = 30;
                }

                if(userId > 0) {
                    var getAmountRandom = getPrize;
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

                    currentDate.setDate(currentDate.getDate() + addDays);
                    const nextOpenDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

                    
                    if(getAmountRandom > 0) {
                        if(type == 'day') {
                            var response = await excuteQuery(`INSERT INTO bonus_transaction (user_id, address, amount, type) VALUES ('${userId}', '${walletAddress}'  ,'${getAmountRandom}', 'DAY')`);
                            var updateUser = await excuteQuery(`UPDATE users SET next_daily_bonus = '${nextOpenDate}', total_deposit = total_deposit + ${getAmountRandom} WHERE id = ${userId}`);
                        }
                        if(type == 'week') {
                            var response = await excuteQuery(`INSERT INTO bonus_transaction (user_id, address, amount, type) VALUES ('${userId}', '${walletAddress}', '${getAmountRandom}', 'WEEK')`);
                            var updateUser = await excuteQuery(`UPDATE users SET next_week_bonus = '${nextOpenDate}', total_deposit = total_deposit + ${getAmountRandom} WHERE id = ${userId}`);
                        }
                        if(type == 'month') {
                            var response = await excuteQuery(`INSERT INTO bonus_transaction (user_id, address, amount, type) VALUES ('${userId}', '${walletAddress}', '${getAmountRandom}', 'MONTH')`);
                            var updateUser = await excuteQuery(`UPDATE users SET next_month_bonus = '${nextOpenDate}', total_deposit = total_deposit + ${getAmountRandom} WHERE id = ${userId}`);
                        }

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
        const { searchParams } = new URL(request.url)
        var type = searchParams.get('type');

        // Check if the user already exists in the database
        const datas = await excuteQuery(
            "SELECT bonus_transaction.address AS ad, bonus_transaction.amount AS a, bonus_transaction.created_at AS t "+
            "FROM bonus_transaction "+
            "WHERE bonus_transaction.type = '"+type+"' "+
            "ORDER BY bonus_transaction.created_at "+
            "DESC LIMIT 5");
        return NextResponse.json({ success: true, message: datas }, {status: 200});

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }
}