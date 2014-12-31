def pairs_five(array)  
  hash = {}
  array.each do |integer|
    if hash[integer]
      hash[integer] +=1
    else
      hash[integer] = 1
    end
  end
  hash.each do |key,value|
    pair = 5 - key
    if hash[pair]
      number_of_matches = [hash[key],hash[pair]].min
      puts "found #{number_of_matches} matches of #{key} and #{pair} to make 5"
    end  
    hash.delete(pair)
  end
end

