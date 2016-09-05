
const session = Electron.remote.session

export default class {
  static get(url) {
    const {cookies} = session.defaultSession

    return new Promise((resolve, reject) => {
      cookies.get({url}, (err, items) => {
        if (err) {
          reject(err)
        } else {
          resolve(items)
        }
      })
    })
  }

  static removeItem(url, name) {
    const {cookies} = session.defaultSession

    return new Promise((resolve, reject) => {
      cookies.remove(url, name, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  static async remove(url) {
    const {cookies} = session.defaultSession

    const items = await this.get(url)
    const deletions = items.map(item => this.removeItem(url, item.name))

    return Promise.all(deletions)
  }
}
