def stair_hop(steps)
  if steps == 0
    return 1
  elsif steps < 0
    return 0
  else
    return stair_hop(steps-1) + stair_hop(steps-2) + stair_hop(steps-3)
  end
end

## steps to solve recursion- 1 base case. 2 

# robot upper left x y grid
# right and down, possible paths to go from 0 0 to X, Y

# say its 2x2
# right right down down
# right down right down
# down right down right
# down down right right
# right down down right
# down right right down 


def robot_mover(x,y)
  if x == 0 && y == 0
    return 1
  elsif x > 0 && y > 0
    return robot_mover(x-1,y) + robot_mover(x,y-1)
  elsif x > 0
    return robot_mover(x-1,y)
  elsif y > 0
    return robot_mover(x,y-1)
  end
end

def magic_index(array)

  # binary search array that stops when you hit the mgaic index 

end

def string_permutation(string)
  if string.length == 1
    return 1
  else
    return string.length * string_permutation(string[0...string.length-1])
  end
end


# Given a sorted array with some sequenced numbers and some non-sequenced numbers. Write an algorithm that takes this array as an input and returns a list of {start, end} of all consecutive numbers. Consecutive numbers have difference of 1 only. 
# E.g. of array: 
# [4, 5, 6, 7, 8, 9, 12, 15, 16, 17, 18, 20, 22, 23, 24, 27]

def consecutives(array)
  consec = [array.shift]
  array.each do |num|
    if consec.last == num - 1
      consec.push num
    else
      p consec
      consec = [num]
    end
  end  
end

def nth_ugly(n)
  # must be fully divisible by ONLY 2 or 3 or 5 (these are the only primes that can be )
  i = 1
  answer = 1
  def max_divide(num, divisor)
    while num % divisor == 0
      num = num / divisor 
    end
    return num
  end
    while i != n
    answer += 1
    possible = max_divide(answer, 2)
    possible = max_divide(possible, 3)
    possible = max_divide(possible, 5)
    if possible == 1
      i += 1 
    end
  end
  return answer
end


array = [
  [0,0,0,0,0],
  [0,1,1,1,0],
  [0,1,1,1,0],
  [0,0,0,0,0]
]

def paint_fill_black(coord, array) # array is a grid/ matrix type thing that represents the thingy 
  if array[coord[0]][coord[1]] == 0
    return
  else
    array[coord[0]][coord[1]] = 0
  end
  if coord[0]-1 >= 0 
    paint_fill_black([coord[0]-1, coord[1]], array)
  end
  if coord[0]+1 < array.length
    paint_fill_black([coord[0]+1, coord[1]], array)
  end
  if coord[1]-1 >= 0
    paint_fill_black([coord[0], coord[1]-1], array)
  end
  if coord[1]+1 < array[0].length
    paint_fill_black([coord[0], coord[1]+1], array)
  end
end

# people.height gives height, 
# people.weight gives weight, dont worry about getting the stufs
# strategy, i can sort by height or sort by weight and then remove offenders from both lists, compare.
def get_longest_tower(array_of_people)


end


def quick_sort(array) # get a pivot, set 2 arrays -> one with stuff that are smaller than the pivot, concat in the end 
  if array.length <= 1
    return array
  end
  pivot_num = array[array.length/2]
  pivot = []
  lesser = []
  greater = []
  array.each do |num|
    if num < pivot_num
      lesser.push(num)
    elsif num > pivot_num
      greater.push(num)
    else
      pivot.push(num)
    end
  end
  return quick_sort(lesser) + pivot + quick_sort(greater)
end

def bubble_sort

end

def merge_sort(array)
  # strategy split in to the basics, compare each, and then merge the sorted small thingies   
  # split the array, sort to adjacent (a merge step)

end

# notes on scalability/memory limits
# task : find documents that contain a list of words (complete )
# so book does not trigger on bookkeeper etc. 

# one time op?  VS repeated number of calls? 
# assume will be called many times -> can pre process the docs
# pretend not millions
# just had 12 docs how to find words?
# i would read each doc thru and tag them for later use?
# e.g. wordA -> in the following docs {1,4,6} etc. 
# so preprocess all the documents, and hash the words to all docs.#  now i can just look up the word -> get all the docs bing bang boom 

# now what goes "wrong" when you have millions of documents?
# the word book or The or whatever could result in a ginormous document list. 
# problem: w/ that many docs, ud have to split the docs over multiple machines. 
# somethn like # of words/ repetition of words can not fit in a full hash table on one machine.

# how to divide? the hash
   # by keyword: 1 machine -> full doc list for a given word
   
   # divide by document
   # machine keyword mapping for a few docs 

   # how these strats differ -> few docs, many words 
   # few words many docs :)

# now that weve decided one of the above
  # how to process doc on 1 machine -> results to other machines
  # if machine is just say documents 1-1000 this might not be necessary

  # as in machine A has found words zed booty foo bar and needs to tell the machine that holds zed etc that documents 1,5,6 hold the word 

# how to know which machine holds what?
# what does the lookup table look like. where is this table kept? 

   # a few concerns there are others possibly ;P KEEP THAT IN MIND


# recap: step1 -> how to do it smallscale
#         step2 -> what problems will occur in large scale
#          step 3 -> how do we solve these problams

# can divide keys by alphabet e.g. a-a-trox -> azir

# so iterate through keywords alpha -> store as much as possible -> next machine 

# advantage : small lookup table -> only specify a range of vals

# bad -> if new words -> can be very expensive to shift keywords (could move across multi machines or smthn . )

# say we have after and builds boat amaze banana 
# sort the list, then tell the appropo machine the lookups

# so then if ur looking for the document that holds ALL of these words, do the intersection (docs in common )


# service: up TO 1k client apps 
# get stock info -> open close high low
# data is already somewhere
# stores in whatever format
# how to design client facing service to give info to client apps 

#XML TO DISTRIBUTE INFO 
# pros: most languages can parse XML
#       easy to distribute -> read both by machine/human
#       can add data to XML by adding more nodes w/o breaking their parser
#        since stored as xml there are aleady tools to backup the data

# cons: they always get the whole shebang whether or not they want it
# doing a query on the data -> must parse the whole file 











