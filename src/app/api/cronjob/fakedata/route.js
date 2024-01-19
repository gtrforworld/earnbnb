import {NextRequest, NextResponse} from "next/server";
import excuteQuery from '@/app/api/libs/db';
export const dynamic = 'force-dynamic';
import axios from "axios";
import { ethers } from 'ethers';

export async function GET(request) {
    try {

        var random1 = getRandomInteger(1, 2);
        // await generateDeposit();
        if(random1 == 1) {
            await generateDeposit();
            await generateWithdraw();
            await generateLottery();
            await generateBonus('DAY');
            await generateBonus('WEEK');
            await generateBonus('MONTH');
        }
        else{
            await generateWithdraw();
            await generateLottery();
            await generateBonus('DAY');
            await generateBonus('WEEK');
            await generateBonus('MONTH');
        }

        return NextResponse.json({ success: true, message: 'Success' }, {status: 200});

    } catch (error) {
        console.log("error", error)
        return NextResponse.json({ success: false, message: 'Error checking/saving address to database' }, {status: 500});
    }

}

function generateRandomAmount(min, max, decimalPlaces) {
    const randomValue = Math.random() * (max - min) + min;  
    const roundedValue = Number(randomValue.toFixed(decimalPlaces));  
    return parseFloat(roundedValue.toFixed(decimalPlaces));
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateDeposit() {
    return new Promise(async (resolve, reject) => {

        const wallet = ethers.Wallet.createRandom();
        const address = wallet.address;
        const privateKey = wallet.privateKey;

        var decimalPlaces = getRandomInteger(1, 4)
        var getRandomAmount = generateRandomAmount(0.001, 2, decimalPlaces);

        await excuteQuery(" INSERT INTO wallets (address, user_id, pk) VALUES ('"+address+"', 0, '"+privateKey+"') ");
        await excuteQuery(" INSERT INTO deposit (address, user_id, amount, status, on_system) VALUES "+
        " ('"+address+"', 0, '"+getRandomAmount+"', 1, 1) ");
       
        return resolve(true);
    })
}

async function generateWithdraw() {
    return new Promise(async (resolve, reject) => {

        var getData = await excuteQuery("SELECT address FROM wallets WHERE user_id = 0 ORDER BY RAND() LIMIT 1");
        var address = "";
        if(getData.length > 0) {
            address = getData[0].address;
        }

        var decimalPlaces = getRandomInteger(1, 4)
        var getRandomAmount = generateRandomAmount(0.001, 2, decimalPlaces);

        await excuteQuery(" INSERT INTO withdraw (address, user_id, amount, status, on_system) VALUES "+
        " ('"+address+"', 0, '"+getRandomAmount+"', 1, 1) ");
       
        return resolve(true);
    })
}

async function generateLottery() {
    return new Promise(async (resolve, reject) => {

        var getData = await excuteQuery("SELECT address FROM wallets WHERE user_id = 0 ORDER BY RAND() LIMIT 1");
        var address = "";
        if(getData.length > 0) {
            address = getData[0].address;
        }

        var decimalPlaces = getRandomInteger(1, 4)
        var getRandomAmount = generateRandomAmount(0.001, 2, decimalPlaces);

        await excuteQuery(" INSERT INTO lottery_transactions (address, user_id, amount) VALUES "+
        " ('"+address+"', 0, '"+getRandomAmount+"') ");
       
        return resolve(true);
    })
}

async function generateBonus(type) {
    return new Promise(async (resolve, reject) => {

        var getData = await excuteQuery("SELECT address FROM wallets WHERE user_id = 0 ORDER BY RAND() LIMIT 1");
        var address = "";
        if(getData.length > 0) {
            address = getData[0].address;
        }

        var decimalPlaces = getRandomInteger(1, 4)
        var getRandomAmount = generateRandomAmount(0.001, 2, decimalPlaces);

        await excuteQuery(" INSERT INTO bonus_transaction (address, user_id, amount, type) VALUES "+
        " ('"+address+"', 0, '"+getRandomAmount+"', '"+type+"') ");
       
        return resolve(true);
    })
}