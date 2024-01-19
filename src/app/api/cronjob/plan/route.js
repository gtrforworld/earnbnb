import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';
import axios from "axios";

export async function GET(request) {
    try {
        var datas = await excuteQuery(`SELECT * FROM plans`);
        if(datas.length > 0) {
            var linkApi = "https://pro-api.coinmarketcap.com/v2/tools/price-conversion?CMC_PRO_API_KEY=d69d5441-62a2-45a6-8496-71b5a415d51e&amount=1&id=1839";
            
            var response = await axios.get(linkApi);

            if(response.data.data.quote.USD.price) {
                var price = response.data.data.quote.USD.price;
                if(price > 0) {
                    var s = 0;
                    for await (var item of datas) {
                        var bnb = item.deposit / price;
                        var limit_wd = bnb * 2;
                        await excuteQuery(" UPDATE plans SET bnb = " + bnb + ", limit_wd = " + limit_wd + " WHERE id = " + item.id);
                        s++;
                    }

                    return NextResponse.json({ success: true, message: s + ' plans updated' }, {status: 200});
                }
                else{
                    return NextResponse.json({ success: false, message: 'prices not found' }, {status: 400});
                }
            }
            else{
                return NextResponse.json({ success: false, message: 'prices not found' }, {status: 400});
            }
        }
        else{
            return NextResponse.json({ success: false, message: 'datas not found' }, {status: 400});
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }

}