#!/usr/bin/env bash
# DO NOT EDIT THIS FILE AS IT IS AUTOGENERATED!

# exit script when any command fails
set -e


# default values of variables set from params
_RUN_STEP_NODE=false
_RUN_STEP_YARN_SETUP=false
_RUN_STEP_VERSIONS=false
_RUN_STEP_YARN_INSTALL=false
_RUN_STEP_BROWSERSLIST=false
_RUN_STEP_ENV=false
_RUN_STEP_UPDATE_EMOJIS=false
_RUN_STEP_FORMAT=false
_RUN_STEP_ESLINT=false
_RUN_STEP_TSC=false
_RUN_STEP_USERSCRIPT=false
_RUN_STEP_BUILDSCRIPT=false
_RUN_STEP_PREBUILD=false
_RUN_STEP_WEBPACK=false
_RUN_STEP_DOCS=false
_RUN_STEP_GIT_DIFF=false
_RUN_STEP_ZIP=false
MODE="development"

while :; do
    case "${1-}" in
        --node) _RUN_STEP_NODE=true ;;
        --yarn_setup) _RUN_STEP_YARN_SETUP=true ;;
        --versions) _RUN_STEP_VERSIONS=true ;;
        --yarn_install) _RUN_STEP_YARN_INSTALL=true ;;
        --browserslist) _RUN_STEP_BROWSERSLIST=true ;;
        --env) _RUN_STEP_ENV=true ;;
        --update_emojis) _RUN_STEP_UPDATE_EMOJIS=true ;;
        --format) _RUN_STEP_FORMAT=true ;;
        --eslint) _RUN_STEP_ESLINT=true ;;
        --tsc) _RUN_STEP_TSC=true ;;
        --userscript) _RUN_STEP_USERSCRIPT=true ;;
        --buildscript) _RUN_STEP_BUILDSCRIPT=true ;;
        --prebuild) _RUN_STEP_PREBUILD=true ;;
        --webpack) _RUN_STEP_WEBPACK=true ;;
        --docs) _RUN_STEP_DOCS=true ;;
        --git_diff) _RUN_STEP_GIT_DIFF=true ;;
        --zip) _RUN_STEP_ZIP=true ;;
        --dependencies)
          _RUN_STEP_YARN_SETUP=true
          _RUN_STEP_VERSIONS=true
          _RUN_STEP_YARN_INSTALL=true
          _RUN_STEP_BROWSERSLIST=true ;;
        --quick)
          _RUN_STEP_ENV=true
          _RUN_STEP_FORMAT=true
          _RUN_STEP_ESLINT=true
          _RUN_STEP_TSC=true
          _RUN_STEP_WEBPACK=true ;;
        --full)
          _RUN_STEP_NODE=true
          _RUN_STEP_YARN_SETUP=true
          _RUN_STEP_VERSIONS=true
          _RUN_STEP_YARN_INSTALL=true
          _RUN_STEP_BROWSERSLIST=true
          _RUN_STEP_ENV=true
          _RUN_STEP_UPDATE_EMOJIS=true
          _RUN_STEP_FORMAT=true
          _RUN_STEP_ESLINT=true
          _RUN_STEP_TSC=true
          _RUN_STEP_USERSCRIPT=true
          _RUN_STEP_BUILDSCRIPT=true
          _RUN_STEP_PREBUILD=true
          _RUN_STEP_WEBPACK=true
          _RUN_STEP_DOCS=true
          _RUN_STEP_GIT_DIFF=true
          _RUN_STEP_ZIP=true ;;
        -p | --production) MODE="production" ;;
        -?*)
          echo "Unknown option: $1"
          exit 1 ;;
        *) break ;;
    esac
    shift
done

total_start_time=$(date +%s%N)

NODE_VERSION=$(grep '"node":' ./package.json | awk -F: '{ print $2 }' | sed 's/[",]//g' | sed 's/\^v//g' | tr -d '[:space:]')
YARN_VERSION=$(grep '"packageManager":' ./package.json | awk -F: '{ print $2 }' | sed 's/[",]//g' | sed 's/yarn@//g' | tr -d '[:space:]')
REF=$(git show-ref --heads --abbrev "$(git branch --show-current)" | grep -Po "(?<=[a-z0-9]{9} ).*$" --color=never)

# [⬆️] Setup Node.js
if [[ $_RUN_STEP_NODE = true ]]; then
    start_time=$(date +%s%N)
    echo "### [⬆️] Setup Node.js ###"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    NVM_DIR=$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install "$NODE_VERSION"
    end_time=$(date +%s%N)
    echo "=== [⬆️] Setup Node.js: $(((end_time - start_time) / 1000000))ms ==="
fi

# [⬆] setup yarn
if [[ $_RUN_STEP_YARN_SETUP = true ]]; then
    start_time=$(date +%s%N)
    echo "### [⬆] setup yarn ###"
    corepack enable
    yarn set version "$YARN_VERSION"
    end_time=$(date +%s%N)
    echo "=== [⬆] setup yarn: $(((end_time - start_time) / 1000000))ms ==="
fi

# [ℹ] print versions (node, yarn, git)
if [[ $_RUN_STEP_VERSIONS = true ]]; then
    start_time=$(date +%s%N)
    echo "### [ℹ] print versions (node, yarn, git) ###"
    echo "node: $(node -v) – yarn: $(yarn -v) – git: $(git --version)"
    end_time=$(date +%s%N)
    echo "=== [ℹ] print versions (node, yarn, git): $(((end_time - start_time) / 1000000))ms ==="
fi

# [🍱] yarn install
if [[ $_RUN_STEP_YARN_INSTALL = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🍱] yarn install ###"
    yarn install --immutable
    end_time=$(date +%s%N)
    echo "=== [🍱] yarn install: $(((end_time - start_time) / 1000000))ms ==="
fi

# [⬆] update browserslist
if [[ $_RUN_STEP_BROWSERSLIST = true ]]; then
    start_time=$(date +%s%N)
    echo "### [⬆] update browserslist ###"
    npx -y browserslist@latest --update-db
    end_time=$(date +%s%N)
    echo "=== [⬆] update browserslist: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🌳] set env variables
if [[ $_RUN_STEP_ENV = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🌳] set env variables ###"
    ref="$REF"
    BRANCH="dummy"
    
    if [[ $ref == "refs/heads/master" ]]; then
      BRANCH="stable"
    elif [[ $ref == "refs/heads/dev" ]]; then
      BRANCH="beta";
    elif [[ $ref == "refs/heads/"* ]]; then
      BRANCH="${ref/"refs/heads/"/}";
      BRANCH="${BRANCH/"/"/"-"}"
    elif [[ $ref == "refs/pull/"* ]]; then
      BRANCH="${ref/"refs/pull/"/"pr"}";
      BRANCH="${BRANCH/"/merge"/}";
      BRANCH="${BRANCH//"/"/"-"}"
    fi
    end_time=$(date +%s%N)
    echo "=== [🌳] set env variables: $(((end_time - start_time) / 1000000))ms ==="
fi

# [⬆] update emojis
if [[ $_RUN_STEP_UPDATE_EMOJIS = true ]]; then
    start_time=$(date +%s%N)
    echo "### [⬆] update emojis ###"
    yarn ts-node scripts/utils/fetchEmojis.ts
    end_time=$(date +%s%N)
    echo "=== [⬆] update emojis: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🎨] format files not covered by ESLint
if [[ $_RUN_STEP_FORMAT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🎨] format files not covered by ESLint ###"
    yarn ts-node scripts/format.ts || exit 1
    end_time=$(date +%s%N)
    echo "=== [🎨] format files not covered by ESLint: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🚨] run ESLint
if [[ $_RUN_STEP_ESLINT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🚨] run ESLint ###"
    yarn eslint \
    ./docs/.vuepress/ \
    ./static/         \
    ./prebuild/       \
    ./build/          \
    ./src/            \
    ./scripts/        \
    ./typings/        \
    --ext .js,.ts,.vue,.md \
    --no-error-on-unmatched-pattern \
    --exit-on-fatal-error \
    --report-unused-disable-directives \
    --cache --cache-strategy content \
    --fix \
    || exit 1
    end_time=$(date +%s%N)
    echo "=== [🚨] run ESLint: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🚨] check TypeScript
if [[ $_RUN_STEP_TSC = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🚨] check TypeScript ###"
    yarn tsc -b --pretty "./" || exit 1
    end_time=$(date +%s%N)
    echo "=== [🚨] check TypeScript: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📜] build userscript
if [[ $_RUN_STEP_USERSCRIPT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📜] build userscript ###"
    yarn tsc --pretty --project "src/tsconfig.userscript.json" || exit 1
    end_time=$(date +%s%N)
    echo "=== [📜] build userscript: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📜] build buildscript
if [[ $_RUN_STEP_BUILDSCRIPT = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📜] build buildscript ###"
    yarn ts-node scripts/createBuildScript.ts || exit 1
    end_time=$(date +%s%N)
    echo "=== [📜] build buildscript: $(((end_time - start_time) / 1000000))ms ==="
fi

# [🚧] run prebuild
if [[ $_RUN_STEP_PREBUILD = true ]]; then
    start_time=$(date +%s%N)
    echo "### [🚧] run prebuild ###"
    yarn ts-node prebuild/index.ts "$MODE" "$BRANCH" "🦄 branch label" || exit 1
    end_time=$(date +%s%N)
    echo "=== [🚧] run prebuild: $(((end_time - start_time) / 1000000))ms ==="
fi

# [👷] webpack
if [[ $_RUN_STEP_WEBPACK = true ]]; then
    start_time=$(date +%s%N)
    echo "### [👷] webpack ###"
    yarn ts-node build/index.ts --esModuleInterop "$MODE" "$BRANCH" "🦄 branch label" || exit 1
    end_time=$(date +%s%N)
    echo "=== [👷] webpack: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📝] build docs
if [[ $_RUN_STEP_DOCS = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📝] build docs ###"
    "$(yarn workspace lss-manager-v4-docs bin vuepress)" build docs || exit 1
    mkdir -p ./dist/docs
    rm -rdf ./dist/docs/*
    cp -r ./docs/.vuepress/dist/* ./dist/docs
    end_time=$(date +%s%N)
    echo "=== [📝] build docs: $(((end_time - start_time) / 1000000))ms ==="
fi

# [ℹ️] git diff
if [[ $_RUN_STEP_GIT_DIFF = true ]]; then
    start_time=$(date +%s%N)
    echo "### [ℹ️] git diff ###"
    git --no-pager diff --color-words
    end_time=$(date +%s%N)
    echo "=== [ℹ️] git diff: $(((end_time - start_time) / 1000000))ms ==="
fi

# [📦] zip files
if [[ $_RUN_STEP_ZIP = true ]]; then
    start_time=$(date +%s%N)
    echo "### [📦] zip files ###"
    sudo apt-get install zip
    zip -r dist.zip dist
    end_time=$(date +%s%N)
    echo "=== [📦] zip files: $(((end_time - start_time) / 1000000))ms ==="
fi

total_end_time=$(date +%s%N)

echo "=== Total: $(((total_end_time - total_start_time) / 1000000))ms ==="