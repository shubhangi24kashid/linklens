import { useEffect, useState } from "react"
import { auth, db } from "../auth/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore"
import { FaUserCircle, FaEnvelope, FaCalendarAlt, FaLink } from "react-icons/fa"
import "./Profile.css"

function Profile() {
  const [user, setUser] = useState(null)
  const [plan, setPlan] = useState("Free")
  const [linkCount, setLinkCount] = useState(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)

        // ✅ Fetch plan from Firestore if you want dynamic plan data
        const userDoc = await getDoc(doc(db, "users", currentUser.uid))
        if (userDoc.exists()) {
          setPlan(userDoc.data().plan || "Free")
        }

        // ✅ Count saved links from "links" collection by filtering on userId
        const q = query(
          collection(db, "links"),
          where("userId", "==", currentUser.uid)
        )
        const linksSnap = await getDocs(q)
        setLinkCount(linksSnap.size)
      }
    })

    return () => unsubscribe()
  }, [])

  if (!user) {
    return <div className="profile-page">Loading profile...</div>
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />
        <h2>{user.displayName || user.email?.split("@")[0]}</h2>

        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">
              <FaEnvelope /> Email
            </span>
            <span className="info-value">{user.email}</span>
          </div>

          <div className="info-row">
            <span className="info-label">
              <FaCalendarAlt /> Joined
            </span>
            <span className="info-value">
              {user.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Plan</span>
            <span className="info-value">
              <span className="plan-badge">{plan}</span>
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">
              <FaLink /> Saved Links
            </span>
            <span className="info-value">{linkCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
