#!/usr/bin/env node
let fs=require("fs");
let path=require("path");
let inputArr=process.argv.slice(2);
let optionsArr=[];
let filesArr=[];
for(let i=0;i<inputArr.length;i++)
{
    if(inputArr[i].charAt(0)=="-")
    {
        optionsArr.push(inputArr[i]);
    }
    else
    {
        filesArr.push(inputArr[i]);
    }
}
// console.log(inputArr);
// console.log(filesArr);
// console.log(optionsArr);

if(filesArr.length==0)
{
    console.log("can't execute any command. please enter file path");
    return;
}
//******************* check for both input simultaneously************
// if(optionsArr.includes("-n") && optionsArr.includes("-b")==true)
// {
//     console.log(`-b and -n can't be executed at the same time. Please enter only one at a time`);
//     return;
// }

//******************* check for file existence*********************
for(i=0;i<filesArr.length;i++)
{
    if(fs.existsSync(filesArr[i])==false)
    {
        console.log(`${filesArr[i]} is not present`);
        return;
    }
}

//******************* Reading all files ***********************
let content=""
for(i=0;i<filesArr.length;i++)
{
    content+=fs.readFileSync(filesArr[i])+"\r\n";

}
console.log("---------- (Reading files)--------");
console.log(content);
let contentArr=content.split("\r\n");

//******************** If -s is present ************************
if(optionsArr.includes("-s")==true)
{
    let contentArr=content.split("\r\n");
    //console.log(contentArr);
    for(i=1;i<contentArr.length;i++)
    {
        if(contentArr[i]=="" && contentArr[i-1]=="")
        {
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null)
        {
            contentArr[i]=null;
        }
    }
    //console.log(contentArr) ;
    let tempArr =[];
    for(i=0;i<contentArr.length;i++)
    {
        if(contentArr[i]!=null)
        {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
    console.log("-------- (-s command result)--------")
    console.log(contentArr.join("\n"));
}
let indexofN = optionsArr.indexOf("-n");
let indexofB = optionsArr.indexOf("-b");
let finaloption = "";
if(indexofN>-1 && indexofB>-1)
{
    if(indexofN<indexofB)
    {
        finaloption="-n";
    }
    else{
        finaloption="-b";
    }
}
else{
    if(indexofB>-1)
    {
        finaloption="-b";
    }
    else if(indexofN>-1)
    {
        finaloption="-n"
    }
}
if(finaloption=="-n")
{
    modifyN(contentArr);
}
else if(finaloption=="-b")
{
    modifyB(contentArr);
}


//************************If -n is present ********************
//if(optionsArr.includes("-n")==true)
function modifyN(contentArr)
{
{
  for(i=0;i<contentArr.length;i++)
  {
      contentArr[i]=`${i+1} ${contentArr[i]}`;
  }
  console.log("-------- (-n command result)--------");
console.log(contentArr.join("\n"));
}
}
//************************If -b is present ********************
function modifyB(contentArr)
{
//if(optionsArr.includes("-b")==true)
{
    let c=1;
    for(i=0;i<contentArr.length;i++)
  {
      if(contentArr[i]!="")
      {
      contentArr[i]=`${c} ${contentArr[i]}`;
      c++;
      }
  }
  console.log("---- (-b command result) ---------");
  console.log(contentArr.join("\n"));
}
}

