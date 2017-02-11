import * as http from 'http'

export default function () {
  return new Promise((resolve, reject) => {
    http.get({
      hostname: 'nuvi-challenge.herokuapp.com',
      port: 80,
      path: '/activities'
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(res.statusCode)
      } else {
        res.setEncoding('utf8')
        let rawData = ''

        res.on('data', (chunk) => rawData += chunk)

        res.on('end', () => {
          try {
            resolve(JSON.parse(rawData))
          } catch (e) {
            reject(e.message)
          }
        })
      }
    })
  })
}
