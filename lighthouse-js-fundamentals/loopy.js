function loopy(){
  for(let a=100; a <= 200; a++){
if((a%3 == 0) && (a%4 == 0)){
      console.log("LoopyLighthouse");
    }
    else if(a % 3 == 0){
      console.log("Loopy");
    }
    else if(a % 4 == 0){
      console.log("Lighthouse")
    }
    else{
      console.log(a);
    }
  }
  }

loopy();