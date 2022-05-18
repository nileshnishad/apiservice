var express = require('express');
var router = express.Router();
var trans= require('trny')
//import { getTransactionInfo } from "trny";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/checkMsg',function(req,res,next){
  //var msg="Dear customer, your RBL Bank a/c XXX3569 is Credited with INR 20000.00 on 05-05-2022 ref IMPS 212509403167 FROM PARAMJIT SINGH avl bal INR 1499009.00";
  //console.log(trans.getTransactionInfo(msg));
  //console.log();

  console.log(req.body.msg)
  if(!req.body.msg)
    res.status(401).json({"message":"Messages not found"})
  var msgObjArr=[];
  
  for (let index = 0; index < req.body.msg.length; index++) {
    const element = req.body.msg[index];
    // msgObjArr.push({"sender":element.sender,"msgObj":trans.getTransactionInfo(element.body)})

    const obj=trans.getTransactionInfo(element.body);
    const refNo=getRefNo(element.body);
    const date=getDate(element.body);
    msgObjArr.push({"date":date,"sender":element.sender,"type":obj.account?obj.account.type:"","no":obj.account?obj.account.no:"","balance":obj.balance,"money":obj.money,"typeOfTransaction":obj.typeOfTransaction,"refno":refNo})
  }
  res.json({"message":"Message found","data":msgObjArr})
})

function getRefNo(msg){
  var refNumber = "";
  console.log(msg);
  if(msg.toLowerCase().includes('ref imps')==true){
    var dataList = msg.toLowerCase().split("ref imps");
    const refReg = new RegExp('([0-9]+).*');
    var data = "";
    if (dataList.length == 2) {
      if(refReg.test(dataList[1]) == true){
        var refMatch= refReg.exec(dataList[1]);
        data = refMatch==null?"":refMatch[1].toString();
      }
    } else {
      if(refReg.hasMatch(dataList[0]) == true){
        var refMatch= refReg.firstMatch(dataList[0]);
        data = refMatch==null?"":refMatch.group(0).toString();
      }
    }
    if(data.includes(")")){
      data = data.split(")")[0];
    }
    refNumber=data;
  }else if(msg.toLowerCase().includes('ref no')==true){
    var dataList = msg.toLowerCase().split("ref no");
    const refReg = new RegExp('([0-9]+).*');
    var data = "";
    if (dataList.length == 2) {
      if(refReg.test(dataList[1]) == true){
        var refMatch= refReg.exec(dataList[1]);
        data = refMatch==null?"":refMatch[1].toString();
      }
    } else {
      if(refReg.hasMatch(dataList[0]) == true){
        var refMatch= refReg.firstMatch(dataList[0]);
        data = refMatch==null?"":refMatch.group(0).toString();
      }
    }
    if(data.includes(")")){
      data = data.split(")")[0];
    }
    refNumber=data;
  }else if(msg.toLowerCase().includes('refno')==true){
    var dataList = msg.toLowerCase().split("refno");
    const refReg = new RegExp('([0-9]+).*');
    var data = "";
    if (dataList.length == 2) {
      if(refReg.test(dataList[1]) == true){
        var refMatch= refReg.exec(dataList[1]);
        data = refMatch==null?"":refMatch[1].toString();
      }
    } else {
      if(refReg.hasMatch(dataList[0]) == true){
        var refMatch= refReg.firstMatch(dataList[0]);
        data = refMatch==null?"":refMatch.group(0).toString();
      }
    }
    if(data.includes(")")){
      data = data.split(")")[0];
    }
    refNumber=data;
  }else if(msg.toLowerCase().includes('ref#')==true){
    var dataList = msg.toLowerCase().split("ref#");
    //const refReg = new RegExp('([0-9]+).*');
    var data = "";
    if (dataList.length == 2) {
      data = dataList[1];
    } else {
      data = dataList[0];
    }
    if(data.includes(")")){
      data = data.split(")")[0];
    }
    refNumber=data;
  }
  
  return refNumber;
}

// function getDate(msg) {
//   const moment = require('moment');
//   var dates="";
//   if (typeof msg === 'string') {
//     msg = msg.toLowerCase().split(' ');
//   }
//   const indexArr = msg.reduce(function(a, e, i) {
//     console.log("a", a);
//     console.log("e", e);
//     console.log("i", i);
//     if (e === 'on'){
//       a.push(i) 
//     }
//     return a;
//   }, 
//   []);

//   if (indexArr.length === 0) {
//     return '';
//   } else {
//     const format = ["DD-MM-YYYY","DD/MM/YYYY","DD-MMM-YYYY","DD-MM-YY","DD/MM/YY","DDMMMYY"]
//     for (let index1 = 0; index1 < indexArr.length; index1++) {
//       const element1 = indexArr[index1];
//       console.log(" element1element1element1element1element1 {{{  <<<<>>>>>",element1+1)
//       for (let index2 = 0; index2 < format.length; index2++) {
//         const element2 = format[index2];
//         //console.log(element1+1,element2)
//         let date = moment(msg[element1+1],element2,true)
//         if(date.isValid()){
//           return date.format("DD MMM YYYY");
//         }
//         dates=date;
//       }
//     }
//     return dates;
//   }
// }



// function getdataaa(msg){
// let text="14may22 by  (ref no 213484735530)";

// patterns = [
//   r^"\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,4}",
//   r^"\d{1,2}/\d{1,2}/\d{2,4}",
// ]

// for (var a=0; a<patterns.length; a++){

//   matches = re.findall(a, text);
//   //print()
//   console.log("matches  ++++++   matches ", matches);

// }



function getdate(msg){
  var getdatedata = "";
  console.log("\n111"+msg);
  if(msg.toLowerCase().includes('on')==true){
    var dataList = msg.toLowerCase().split("on");
    console.log("\n222"+ dataList );
    var str= ["15/12/2020 by INR 3,211.00 towards purchase. Avl"];
    console.log( "\n333"+ msg.toLowerCase().split("on"));
    const dateReg = new RegExp('r^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])');
    console.log("\n444"+dateReg);
    var data = "";
   // console.log("$$$$$$",dataList);
    if (str.length == 0) {
      console.log("iff", dateReg.hasMatch(str));
      console.log("!!!!!", (str));

      if(dateReg.test(str) == true){
       console.log( "{}{}{}{}",dateReg.test(str));
        // var refMatch= dateReg.exec(dataList[1]);
        // data = refMatch==null?"":refMatch[1].toString();
      }
    } else {
      console.log("elsee");
      if(dateReg.hasMatch(dataList[0]) == true){
        var refMatch= dateReg.firstMatch(dataList[1]);
        data = refMatch==null?"":refMatch.group(0).toString();
        console.log("date match"+data);
      }
    }
    if(data.includes(")")){
      data = data.split(")")[0];
    }
    
    getdatedata=data;
  } 
   return getdatedata;
}

module.exports = router;


