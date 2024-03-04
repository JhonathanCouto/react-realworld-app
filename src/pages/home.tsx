import { useAuth } from "../auth/use-auth"

export function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      {!user && (
        <p>Welcome to Realworld React App!</p>
      )}

      {user && (
        <p>Hello {user?.username}, welcome!! your email is {user.email}</p>
      )}
    </div>
  )
}