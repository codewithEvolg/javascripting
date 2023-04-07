const range = function(start, end, step){
  if(start == undefined || end == undefined || step == undefined || start > end || step < 0){
    return [];
  }
  let rangeArray = [];
  for (let i = start; i <= end; i+=step) {
    rangeArray.push(i);
  }
  return rangeArray;
}
