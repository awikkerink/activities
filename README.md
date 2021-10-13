# d2l-activities

Web components to be used with activities entities!

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.


### Running the demos

Start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the demo pages:

```shell
npm start
```

### Linting

To lint ([eslint](http://eslint.org/) and [Polymer lint](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#lint)):

```shell
npm run lint
```

*Note: You may likely run into memory issues when running the linter. To resolve this on Windows, add an environment variable called `NODE_OPTIONS` with value `--max_old_space_size=10240`. Then (re)start a Powershell Terminal as Admin, navigate to the root of this repo, and then run the lint command above.


### Testing

To run unit tests locally using [Jest](https://jestjs.io/):

```shell
npm run test:js
```

To run unit tests locally using [Polymer test](https://www.polymer-project.org/3.0/docs/tools/polymer-cli-commands#tests):

```shell
npm run test:polymer:local
```
_When running the above command, if you are encountering an error indicating `Error: unable to get local issuer certificate` when attempting to download selenium drivers you may need to execute the following command in your windows powershell terminal to disable TLS validation: `setx NODE_TLS_REJECT_UNAUTHORIZED 0`. You may also want to set this value back to `1` when complete._

To lint AND run local unit tests:

```shell
npm test
```

## Usage

Quick Eval should be pulled directly from `my-unassessed-activities`:

```html
<d2l-quick-eval href="https://activities.[[apiUrl]]/my-unassessed-activities" token="token"></d2l-quick-eval>
```

### Visual Diff Testing

This repo uses the [@brightspace-ui/visual-diff utility](https://github.com/BrightspaceUI/visual-diff/) to compare current snapshots against a set of golden snapshots stored in source control.

The golden snapshots in source control must be updated by Github Actions.  If your PR's code changes result in visual differences, a PR with the new goldens will be automatically opened for you against your branch.

If you'd like to run the tests locally to help troubleshoot or develop new tests, you can use these commands:

```shell
# Install dependencies locally
npm i mocha -g
npm i @brightspace-ui/visual-diff puppeteer --no-save
# run visual-diff tests
mocha './test/**/*.visual-diff.js' -t 10000
# subset of visual-diff tests:
mocha './test/**/*.visual-diff.js' -t 10000 -g some-pattern
# update visual-diff goldens
mocha './test/**/*.visual-diff.js' -t 10000 --golden
```

#### Procedure for testing on a local developer machine:

1. Checkout the master branch: `git checkout master`.
2. Generate the golden (baseline) images: `mocha './test/**/*.visual-diff.js' -t 10000 --golden`.
3. Checkout your branch to test: `git checkout <desired branch>`.
4. Running the visual difference tests: `mocha './test/**/*.visual-diff.js' -t 10000`.

#### Other information

The golden images are stored at the following path: `\test\<component>\perceptual\screenshots\golden\`.
The currently generated test images are stored at the following path: `\test\<component>\perceptual\screenshots\current\`.

On a test failure, the difference between the goldens and the current images will be stored in the `current` directory with the `-diff` suffix before the file extension. Example: `d2l-quick-eval-search-results-summary-container-many-no-more-diff.png`.

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix: ` and `feat: ` will trigger patch and minor releases when merged to `master`. Read on for more details...
Don't forget the ` ` after `:`

The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)

### Cert Fixes

Use `/backport [targeted release branch name]` to create a draft PR on the targeted release branch with the exact same changes in the source PR.
`targeted release branch name` should be in the format `20.x.y` and the release branch should exist remotely, e.g. `release/20.21.7` -> `/backport 20.21.7`.

Things to note:
* Make sure to review the changes carefully before marking the draft PR as ready or merging it into the cert branch.
* Use the backport command after changes in the source PR have been finalized (ideally after the source PR has been merged into `master`).
* If a backport PR has already been successfully created, further changes in the source PR should be put into a new PR or manually cherry-picked as multiple patches containing the same commits applied to the same destination branch would cause conflicts.
