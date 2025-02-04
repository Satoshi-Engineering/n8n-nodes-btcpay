# 🚀 Release Guide

Follow these steps to ensure a smooth release process.

1. Ensure you are **logged into GitHub** and have **access to the repository**.
2. Bump Version & Push Changes: Run the following command to update the version and push changes:

   ```bash
   pnpm run bump-version
   ```

   > **⚠️ IMPORTANT**: This command will open your web browser. **DO NOT** proceed until the script has completed the `git push`.

3. Publish the Release
   Once the script has finished pushing to GitHub:
   - **Switch to your browser.**
   - Locate the **"Publish release"** button on GitHub and click it.

4. Automatic Deployment: The release pipeline will be **automatically triggered** and will publish a new **npm package**.

---

## ℹ️ Additional Information

### 🔍 Print the Changelog

If you only want to generate and review the changelog without making a release, run:

```bash
npx changelogen@latest
```
