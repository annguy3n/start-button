const TIME = 300000
let estimatedTime = TIME

export type Status = 'Preparing' | 'Done' | null
let _status: Status = null

export const start = async () => {
  estimatedTime = TIME
  const updating = setInterval(() => {
    if (estimatedTime > 0) {
      estimatedTime = estimatedTime - 500
      _status = 'Preparing'
    } else {
      _status = 'Done'
      clearInterval(updating);
    }
  }, 500);

  return {
    ok: true,
    status: 'Preparing',
    estimatedTime: estimatedTime,
  }
}

export const getStatus = async () => ({
  status: _status,
  estimatedTime: estimatedTime > 0 ? estimatedTime : 0
})
