import { useEffect } from "react"

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("x-access-token")
        window.location.reload()
    })
}

export default Logout