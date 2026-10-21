import subprocess
import sys
import os

def run_cmd(cmd):
    print(f"Executing: {cmd}")
    result = subprocess.run(cmd, shell=True)
    return result.returncode

def main():
    print("=== STEP 1: Building Production Bundle ===")
    build_cmd = "npm.cmd run build" if os.name == "nt" else "npm run build"
    if run_cmd(build_cmd) != 0:
        print("Build failed!")
        sys.exit(1)

    print("=== STEP 2: Deploying Publicly to Cloudflare Pages ===")
    wrangler_cmd = "npx.cmd wrangler" if os.name == "nt" else "npx wrangler"
    deploy_code = run_cmd(f"{wrangler_cmd} pages deploy dist --project-name=wixoi-ai --commit-dirty=true")
    if deploy_code != 0:
        print("Wrangler project 'wixoi-ai' may need creation first. Creating and deploying...")
        run_cmd(f"{wrangler_cmd} pages project create wixoi-ai --production-branch=main")
        run_cmd(f"{wrangler_cmd} pages deploy dist --project-name=wixoi-ai --commit-dirty=true")

if __name__ == "__main__":
    main()
