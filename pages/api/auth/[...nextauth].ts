import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  secret: "estes-secret-1s-s0-s3cr3t",
  pages: {
    signIn: "/auth/signin"
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    })
    // ...add more providers here
  ]
});
