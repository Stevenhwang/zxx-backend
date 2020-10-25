const { Cancellation, Entryticket } = require('../models/invoice');
const { Payment, Respay } = require('../models/moneyFlow');
const material = require('../models/material');
const Material = material.Material;
const Change = material.Change;
const product = require('../models/product');
const Sale = product.Sale;
const Refund = product.Refund;

function  doHandleMonth(month) {
    let m = month
    if (month.toString().length === 1) {
      m = '0' + month
    }
    return m
};

function getDate(day) {
    const today = new Date()
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
    today.setTime(targetday_milliseconds)
    const tYear = today.getFullYear()
    let tMonth = today.getMonth()
    let tDate = today.getDate()
    tMonth = doHandleMonth(tMonth + 1)
    tDate = doHandleMonth(tDate)
    return tYear + '-' + tMonth + '-' + tDate
};

let getAmount = async (model, day) => {
    const m = await model.findOne({ where: { date: getDate(day) } })
    if (m === null) {
        return 0
    } else {
        return m.amount
    }
}

let getDashboard = async(ctx) => {
    const lineChartData = {
        newVisitis: {
            expectedData: {
                name: '原材料',
                data: [await getAmount(Material, -6),
                await getAmount(Material, -5),
                await getAmount(Material, -4),
                await getAmount(Material, -3),
                await getAmount(Material, -2),
                await getAmount(Material, -1),
                await getAmount(Material, 0)]
            },
            actualData: {
                name: '退换货',
                data: [await getAmount(Change, -6),
                await getAmount(Change, -5),
                await getAmount(Change, -4),
                await getAmount(Change, -3),
                await getAmount(Change, -2),
                await getAmount(Change, -1),
                await getAmount(Change, 0)]
            }
        },
        messages: {
            expectedData: {
                name: '销售额',
                data: [await getAmount(Sale, -6),
                await getAmount(Sale, -5),
                await getAmount(Sale, -4),
                await getAmount(Sale, -3),
                await getAmount(Sale, -2),
                await getAmount(Sale, -1),
                await getAmount(Sale, 0)]
            },
            actualData: {
                name: '退换货',
                data: [await getAmount(Refund, -6),
                await getAmount(Refund, -5),
                await getAmount(Refund, -4),
                await getAmount(Refund, -3),
                await getAmount(Refund, -2),
                await getAmount(Refund, -1),
                await getAmount(Refund, 0)]
            }
        },
        purchases: {
            expectedData: {
                name: '付款额',
                data: [await getAmount(Payment, -6),
                await getAmount(Payment, -5),
                await getAmount(Payment, -4),
                await getAmount(Payment, -3),
                await getAmount(Payment, -2),
                await getAmount(Payment, -1),
                await getAmount(Payment, 0)]
            },
            actualData: {
                name: '收款额',
                data: [await getAmount(Respay, -6),
                await getAmount(Respay, -5),
                await getAmount(Respay, -4),
                await getAmount(Respay, -3),
                await getAmount(Respay, -2),
                await getAmount(Respay, -1),
                await getAmount(Respay, 0)]
            }
        },
        shoppings: {
            expectedData: {
                name: '销项票',
                data: [await getAmount(Cancellation, -6),
                await getAmount(Cancellation, -5),
                await getAmount(Cancellation, -4),
                await getAmount(Cancellation, -3),
                await getAmount(Cancellation, -2),
                await getAmount(Cancellation, -1),
                await getAmount(Cancellation, 0)]
            },
            actualData: {
                name: '进项票',
                data: [await getAmount(Entryticket, -6),
                await getAmount(Entryticket, -5),
                await getAmount(Entryticket, -4),
                await getAmount(Entryticket, -3),
                await getAmount(Entryticket, -2),
                await getAmount(Entryticket, -1),
                await getAmount(Entryticket, 0)]
            }
        }
    };
    const panelData = {
        purchases: {
            pay: eval(lineChartData.newVisitis.expectedData.data.join('+')),
            change: eval(lineChartData.newVisitis.actualData.data.join('+'))
        },
        shipment: {
            sales: eval(lineChartData.messages.expectedData.data.join('+')),
            return: eval(lineChartData.messages.actualData.data.join('+'))
        },
        moneyflow: {
            payment: eval(lineChartData.purchases.expectedData.data.join('+')),
            respay: eval(lineChartData.purchases.actualData.data.join('+'))
        },
        invoice: {
            cancellation: eval(lineChartData.shoppings.expectedData.data.join('+')),
            entryticket: eval(lineChartData.shoppings.actualData.data.join('+'))
        }
    };
    ctx.body = {
        code: 0,
        lineChartData: lineChartData,
        panelData: panelData
    }
}

module.exports = {
    'GET /getDashboard': getDashboard
};
