import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    var walletAddress = searchParams.get('address');

    if (walletAddress) {
        try {
            var getUser = await excuteQuery(`SELECT id FROM users WHERE address = '${walletAddress}' LIMIT 1`);
            var userId = 0;
            if(getUser.length > 0) {
                userId = getUser[0].id;
            }

            var countLevel1 = await excuteQuery('SELECT count(1) AS t FROM `referral` where referral = "'+userId+'" and level = 1;')
            var countLevel2 = await excuteQuery('SELECT count(1) AS t FROM `referral` where referral = "'+userId+'" and level = 2;')
            var countLevel3 = await excuteQuery('SELECT count(1) AS t FROM `referral` where referral = "'+userId+'" and level = 3;')
            
            var myReferral = await excuteQuery("SELECT users.address AS a, users.created_at AS c " +
            "FROM referral AS refTable " + 
            "JOIN users ON refTable.user = users.id " + 
            "WHERE refTable.referral = " + userId + " AND users.address != 'ROOT' ");
            console.log("CON", countLevel1)
            
            return NextResponse.json({ success: true, message: {lvl1: countLevel1[0].t, lvl2: countLevel2[0].t, lvl3: countLevel3[0].t, ref:  myReferral} }, {status: 200});

        } catch (error) {
            return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
        }
    } else {
        return NextResponse.json({ success: false, message: 'address is required' }, {status: 400});
    }
}