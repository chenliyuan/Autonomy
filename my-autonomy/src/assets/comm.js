function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

function dateFormatSimple(fmt, date) {
    let ret;
    const opt = {
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

function timeFn(dateBegin,dateEnd) {//di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    console.log(typeof dateBegin)
    if(typeof dateBegin=='string'){
     dateBegin = new Date(dateBegin.replace(/-/g, "/"));//将-转化为/，使用new Date
    }
    if(typeof dateEnd=='string'){
     dateEnd = new Date(dateEnd.replace(/-/g, "/"));//将-转化为/，使用new Date
    }
    console.log(dateBegin,dateEnd)
    // let dateEnd = new Date();//获取当前时间
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
    let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
    let leave1=dateDiff%(24*3600*1000) //计算天数后剩余的毫秒数
    let hours=Math.floor(leave1/(3600*1000))//计算出小时数
    //计算相差分钟数
    let leave2=leave1%(3600*1000) //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
    //计算相差秒数
    let leave3=leave2%(60*1000) //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave3/1000)
    return dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"
    console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
    console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
    ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
    }

export {dateFormat,dateFormatSimple,timeFn}