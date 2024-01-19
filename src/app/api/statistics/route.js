import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        var deposit = await excuteQuery("SELECT SUM(amount) AS d FROM deposit ");
        var withdraw = await excuteQuery("SELECT SUM(amount) AS w FROM withdraw ");
        var lottery = await excuteQuery("SELECT SUM(amount) AS l FROM lottery_transactions ");
        var people = await excuteQuery("SELECT COUNT(1) AS u FROM users ");
        var peopleDeps = await excuteQuery("SELECT COUNT(1) AS total FROM deposit ");

        var data = {
            deposit: deposit[0].d + 172,
            withdraw: withdraw[0].w,
            lottery: lottery[0].l,
            people: people[0].u + 912 + (peopleDeps[0].total),
        }
        
        return NextResponse.json({ success: true, message: data}, {status: 200});

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }
}