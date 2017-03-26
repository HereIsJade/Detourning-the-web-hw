from pattern.en import ngrams
from collections import Counter
from videogrep import videogrep
import sys

filename=sys.argv[1]
srt_name=filename.replace('.mp4','.srt')
#read subtitle file
lines=open(srt_name).read()
grams=ngrams(lines,3) #grams like [(' ','  ','  '),(' ','  ','  '),...]

#find the 10 most common phrases
most_common=Counter(grams).most_common(10) #returns like [('dd', 'kk','ddddd'),2]
search_phrase=most_common[0][0]
search_phrase=' '.join(search_phrase)

# for phrase in most_common:
#     print ' '.join(phrase[0])

videogrep([filename],filename+'.most_common.mp4',search_phrase,'re')
