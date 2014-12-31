# You are given with an array of 1s and 0s. And you are given with an integer m, which signifies number of flips allowed. 

# find the position of zeros which when flipped will produce maximum continuous series of 1s. 

# e.g. 
# input: 
# arr={1 1 0 1 1 0 0 1 1 1 } m=1 
# output={1 1 1 1 1 0 0 1 1 1} position=2 

# arr={1 1 0 1 1 0 0 1 1 1 } m=2 
# output={1 1 0 1 1 1 1 1 1 1} position=5,6

# i need to switch X 0's with 1's
# then i need to find how long the thingy is 

# so depending on the round, skip the first X zeroes

#is this as multi step as i believe it to be?

# instead of keeping track of the actual positions as needed
# stick the 1s in, check the array, save it as best.
#  do for X shifts
# how many shifts you ask? 

# say i have 5 0s and 1 1 to put in 5 shifts ez
# now the same but with 2 1's  now thats 4 shifts? - - - - - or 4 combos rather
# now the same again but with 3 1's, thats 3 shifts
# so it seems like its zeros - (flips - 1) number of combos to work w/

# alternatively keep a running track of the position in which you flipped a number



def get_number_of_zeros(array)
  total = 0
  array.each do |el|
    if el == 0
      total+=1
    end
  end
  total
end


def get_positions(array,flips)
  zeros = get_number_of_zeros(array)
  combo = zeros - (flips-1)
  count = 0
  skip = 0
  result = array.clone
  array.each_with_index do |el,i|
    if el == 0 &&  
      if count >= skip
        result[i] = 1
      end
      count += 1
    end
  end
end


# question 2 convert if necessary bytes to be human readable e.g. 341B -> 341B, but more would be 1.23MB

# strategy, based on modulo, use a hash to determine which thing to use.

#translate a string that is XXXXXXB into the something that fits the pattern
  #pseudo: if length is between 0 and 3 use B
  # if length between 4-6 divide by 1000, take the 3, use K 
  # if length between 7-9 divide my 1000000000 take 3 use M
  # length greater than 10 use G



def byte_reader(byte)

  byte_translator = { 3 => "B" , 6 => "K", 9 => "M", 12 => "G"}
  converted_byte = byte.to_i.to_s
  result = ""
  byte_translator.each do |key, value|
    if converted_byte.length <= key
      predecimal = (converted_byte.to_i/(10**(key-3))).to_s
      postdecimal = (converted_byte.to_i % (10**(key-3))).to_s
      postdecimal = postdecimal[0...3-predecimal.length]
      if postdecimal == "0" || postdecimal == ""
        return predecimal + value
      else
        return result = predecimal+ "." + postdecimal + value
      end
    end
  end
end



def space_sub(string)

  string.gsub!(/\%20/, " ")
  return string
  
end

# ALTERNATIVELY
require 'uri'
URI.decode("")

# you get a list of numbers, get the difference between a - b, b - c etc.


def difference(array)

  start = 0
  result = []
  while start < array.length
    result.push(array[start+1] - array[start])
    start +=1
  end
  return result
end


def isPalindrome()

end


def get_permutations(string)

  if string.length == 1
    answer = [string]
    return answer
  else
    split_string = string.split(//)
    chopped_char = split_string.pop
    string = split_string.join
    result = []
    get_permuations(string).each do |answer|
      position = 0 
      while position <= answer.length
        result.push(answer.clone.insert(position, chopped_char))
        position += 1
      end
    end
    return result
  end
end

def uniqueness(string)
  if string.length == 1
    return true
  end
  start = 0
  while start <= string.length
    if string[start+1] == string[0]
      return false
    else
      start += 1
    end
  end
  uniqueness(string[1..-1])
end

def is_permutation(string1, string2)
# cheaty method
  string1 = string1.split(//).sort.join
  string2 = string2.split(//).sort.join
  if string1 == string2
    return true
  end
  return false
end

def is_permutation_two(string1,string2)
  i = 0
  while i < string1.length
    comparison_char = string1[i]
    if string1.count(comparison_char) == string2.count(comparison_char)
      i +=1
    else
      return false
    end
  end
  return true
end

def translate_spaces(string)
  string.gsub!(/ /, "%20" )
end

def translate_spaces2(string)
  for i in 0...string.length
    if string[i] == " "
      string[i] = "%20"
    end
  end
  return string
end

def string_compress(string)
  count = 1
  compressed_string = ""
  for i in 0...string.length 
    if string[i] == string[i+1]
      count+=1
    else
      compressed_string = compressed_string + string[i] + count.to_s
      count = 1
    end
  end
  if compressed_string.length < string.length
    return compressed_string
  else
    return string
  end
end

def zero_out(matrix)
  x = matrix.length
  y = matrix.length[0]
  zeros = []
  for i in 0...x
      for g in 0...y
          if matrix[i][g] == 0
              zeros.push([i,g])
          end
      end
  end
  zeros.each do |coord| 
    for a in 0...x
        matrix[a][coord[1]] = 0
    end
    for b in 0...y
        matrix[coord[0]][b] = 0
    end
  end
end









