import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
import { formatDistance, parseISO, differenceInSeconds } from 'date-fns';
export const dynamic = 'force-dynamic' // defaults to auto

const percentStart = process.env.NEXT_PUBLIC_DEPOSIT_PERCENT;;
const amountStart = process.env.NEXT_PUBLIC_DEPOSIT_AMOUNT;

export async function POST(NextRequest) {
    try {
        var { walletAddress, refId } = await NextRequest.json();
        if (walletAddress) {
            try {
                // Check if the user already exists in the database
                const existingUser = await excuteQuery(`SELECT * FROM users WHERE address = '${walletAddress}' LIMIT 1`);
                if (existingUser.length > 0) {
                    // User already exists

                    // update bonus balance 
                    var getBonusPerSecond = existingUser[0].total_deposit * (existingUser[0].income_per_day / 100) / 60 / 60 / 24;
                    var oldBonus = existingUser[0].bonus_now;

                    var dateFrom = existingUser[0].last_updated_bonus;
                    if(dateFrom == null) {
                        dateFrom = existingUser[0].created_at;
                    }
                    const date1 = new Date(dateFrom); // Replace this with your target date
                    const currentDate = new Date();
                    var diffSecond = differenceInSeconds(currentDate, date1);

                    var newBonus = oldBonus + (getBonusPerSecond * diffSecond);
                    var updateBonus = await excuteQuery(`UPDATE users SET bonus_now = ${newBonus}, last_updated_bonus = NOW() WHERE address = '${walletAddress}'`);

                    return NextResponse.json({ success: true, message: 'Login successful' }, {status: 200});
                } else {
                    
                    if(!refId) {
                        refId = process.env.NEXT_PUBLIC_DEFAULT_REFERRAL_ID;
                    }
                    var refData  = await excuteQuery(`SELECT * FROM users WHERE id = ${refId} LIMIT 0,1`);
                    if(refData.length > 0) {
                        // Save the Tron address to the database
                        var afterInsert = await excuteQuery(`INSERT INTO users (address, income_per_day, total_deposit) VALUES ('${walletAddress}', ${percentStart}, ${amountStart})`);
                        var userId = afterInsert.insertId;

                        // Save the referral ID to the database
                        await excuteQuery(`INSERT INTO referral (referral, user, level) VALUES (${refId}, ${userId}, 1)`);
                        await excuteQuery(`INSERT INTO referral (referral, user, level) SELECT DISTINCT referral, ${userId}, (level + 1) FROM referral WHERE user = ${refId} AND level < 3`);
        
                        // Respond with success
                        return NextResponse.json({ success: true, message: 'Login successful' }, {status: 200});
                    }
                    else{
                        return NextResponse.json({ success: false, message: 'referral not found' }, {status: 400});
                    }
                }
            } catch (error) {
                console.log("error", error);
                return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
            }
        } else {
            return NextResponse.json({ success: false, message: 'address is required' }, {status: 400});
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'bad request' }, {status: 500});
    }
}