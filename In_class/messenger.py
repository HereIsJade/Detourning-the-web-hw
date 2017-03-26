import random
import videoMash
import Twillio

sid='dddd'
token=''

nouns=open('nouns.txt','r').readlines()
word1=random.choice(nouns).strip()
word2=random.choice(nouns).strip()
print word1,word2

outfile=word1+word2+'.mp4'
videoMash.mash(word1,word2)


username='dh_ag4zvv'
password='Nc6EALw6'
host='vidds.jingfei-lin.com'
port=22
transport=paramiko.Transport((host,port))
transport.connect(username=username,password=password)


sftp=paramiko.SFTPClient.from_transport(transport)
path='./vidds.jingfei-lin.com/'+outfile
sftp.put(outfile,path)

sftp.close()
transport.close()

url='http://vidds.jingfei-lin.com/'+outfile
print url

body=word1+' '+word2+': '+url

client=TwillioRestClient(sid,token)
message=client.messages.create(to="+111",from_="+19175957850",body=body)
