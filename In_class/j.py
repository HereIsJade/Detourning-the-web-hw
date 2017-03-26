import requests
response=requests.get('https://disqus.com/api/3.0/threads/listPostsThreaded?limit=50&thread=5558487974&forum=breitbartproduction&order=popular&cursor=1%3A0%3A0&api_key=E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F').json()
responses=response['response']

for r in responses:
    print r['raw_message']
