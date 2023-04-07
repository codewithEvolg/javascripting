const smartGarbage = function (trash, bins) {
  // Your code in here ...
  bins[trash] = bins[trash] + 1;
  console.log(bins);

    // if(bin.contains(trash)){
    //   bin[trash] = bin[trash] + 1
    // }
  
}

smartGarbage('recycling', { waste: 4, recycling: 2, compost: 5 });