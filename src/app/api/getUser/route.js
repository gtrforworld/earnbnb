import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    var walletAddress = searchParams.get('address');

    if (walletAddress) {
        try {
            var getUser = await excuteQuery(`SELECT id AS i, total_deposit AS d, total_deposit_real AS r, income_per_day AS ipd, bonus_now AS bn, next_lottery_open AS llo, next_daily_bonus AS db, next_week_bonus AS wb, next_month_bonus AS mb, is_referal_qualified AS irq, is_deposit_qualified AS idq FROM users WHERE address = '${walletAddress}' LIMIT 1`);
            if(getUser.length > 0) {
                return NextResponse.json({ success: true, message: getUser }, {status: 200});
            }
            else{
                return NextResponse.json({ success: false, message: 'user not found' }, {status: 400});
            }

        } catch (error) {
            return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
        }
    } else {
        return NextResponse.json({ success: false, message: 'address is required' }, {status: 400});
    }
}