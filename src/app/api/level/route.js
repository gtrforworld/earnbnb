import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        // Check if the user already exists in the database
        const datas = await excuteQuery('SELECT level, deposit AS d, income_per_day as c, bnb AS b, limit_wd as ld FROM plans ORDER BY LEVEL DESC');
        return NextResponse.json({ success: true, message: datas }, {status: 200});

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }
}