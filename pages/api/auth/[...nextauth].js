import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  // Configure one or more authentication providers
  secret: process.env.SECRET,

  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })

    // ...add more providers here
  ],
  session: {
    jwt: true
  },
  callbacks: {
    /**
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    async jwt(token, user, account, profile, isNewUser) {
      // Add access_token to the token right after signin
      if (user) {
        if (user?.name === "dmuraco3") {
          token.isAdmin = true;
        } else {
          token.isAdmin = false;
        }
      }
      return token;
    },
    async session(session, token) {
      session.user.isAdmin = token.isAdmin;
      return session;
    }
  }
  // A database is optional, but required to persist accounts in a database
});
