export const formatTime = (time, devise, state) =>{
    let seconds
    let minuts
    let hours

    this.state = state

    if (time < 60) {
        seconds = time
        minuts = 0
        hours = 0
    } else {
        minuts = Math.floor(time / 60)
        seconds = time % 60

        if (minuts > 60) {
            hours = Math.floor(minuts / 60)
            minuts = minuts % 60

        } else {
            hours = 0
        }
    }

    const addZero = (number) => {
        if (number < 10) {
            number = '0' + number
            return number
        } else {
            return number + ''
        }
    }

    hours = addZero(hours)
    minuts = addZero(minuts)
    seconds = addZero(seconds)

    time = hours + ':' + minuts + ':' + seconds

    if (devise === 'computer') {
        this.setState({computerTime: time})
    } else {
        this.setState({mobileTime: time})
    }
}