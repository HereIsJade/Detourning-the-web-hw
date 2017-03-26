import moviepy.editor as mp
import random

video=mp.VideoFileClip('fluxus.mp4')

# clip1=video.subclip(1,4)
# clip2=video.subclip(3,6)
#
# finalVideo=mp.concatenate_videoclips([clip1,clip2])
# finalVideo.write_videofile('comp.mp4')

final_clips=[]
segment_duration=1
total_duration=video.duration

startTime=0

while startTime<5:
    endTime=startTime+segment_duration
    print (startTime,endTime)
    clip=video.subclip(startTime,endTime)
    final_clips.append(clip)

    startTime=endTime

random.shuffle(final_clips)
finalVideo=mp.concatenate_videoclips(final_clips)
finalVideo.write_videofile('randomnoise.mp4')
