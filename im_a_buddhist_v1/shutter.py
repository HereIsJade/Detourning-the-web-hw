import requests
import sys
from bs4 import BeautifulSoup
from subprocess import call

size='600x480!'

def download_file(url):
    local_filename = url.split('/')[-1]
    # NOTE the stream=True parameter
    r = requests.get(url, stream=True)
    with open(local_filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
                #f.flush() commented by recommendation from J.F.Sebastian
    return local_filename

def search(q,page):
    url='https://www.shutterstock.com/search'
    # url='https://www.shutterstock.com/search?search_source=base_search_form&language=en&sort=popular&image_type=all&safe=true&searchterm='+q
    querystring={
        'language':'en',
        'image_type':'photo',
        'searchterm':q,
        'page':page,
        'orientation':'horizontal'
    }

    html=requests.get(url, params=querystring).text
    # html=requests.get(url+q).text
    soup=BeautifulSoup(html, "html.parser")
    # print soup
    images=soup.select(".img-wrap img")#soup obj
    # print images
    if len(images)==0:
        exit()

    for image in images:
        src='http:'+image.get('src')
        # descrip=image.get('alt')
        print src
        local_name=download_file(src)
        # call(['magick \'*.jpg\' -resize ',size,local_name[12:]+'.resized.jpg'])
        # call(['open',local_name+'.solarized.jpg'])
        # call(['say',descrip])
    search(q,page+1)

search(sys.argv[1],1)
# call('convert','cop.jpg','cop.png')
