import moviepy.editor as mp

video1=mp.VideoFileClip('fluxus.mp4')
video2=mp.VideoFileClip('noise.mp4')
finalVideo=mp.concatenate_videoclips([video2,video1])
finalVideo.write_videofile('final.mp4')
