1.3.0 / 2022-04-11
=================
  * [New] `shim`/`auto`: add `flat` to `Symbol.unscopables`
  * [Deps] update `es-abstract`
  * [actions] reuse common workflows
  * [actions] update codecov uploader
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `@es-shims/api`, `aud`, `auto-changelog`, `object-inspect`, `safe-publish-latest`, `tape`

1.2.5 / 2021-10-01
=================
  * [readme] add github actions/codecov badges; remove travis badge
  * [Deps] update `call-bind`, `es-abstract`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `@es-shims/api`, `aud`, `has-strict-mode`, `object-inspect`, `tape`
  * [meta] use `prepublishOnly`, for npm 7+
  * [actions] use `node/install` instead of `node/run`; use `codecov` action
  * [actions] update workflows
  * [Tests] increase coverage
  * [meta] fix changelog for v1.2.4

1.2.4 / 2020-11-18
=================
  * [meta] do not publish Github Action workflows
  * [Deps] update `es-abstract`; add `call-bind` where applicable
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `aud`, `object-inspect`, `tape`
  * [Tests] run `nyc` on all tests
  * [Tests] add `implementation` test; run `es-shim-api` in postlint; use `tape` runner
  * [Tests] migrate tests to Github Actions
  * [actions] add "Allow Edits" workflow
  * [actions] switch Automatic Rebase workflow to `pull_request_target` event

1.2.3 / 2019-12-12
=================
  * [Refactor] use split-up `es-abstract` (65% bundle size decrease)
  * [Deps] update `es-abstract`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `safe-publish-latest`, `object-inspect`
  * [meta] ESnext -> ES2019
  * [meta] add `funding` field
  * [Tests] use shared travis-ci configs
  * [actions] add automatic rebasing / merge commit blocking

1.2.2 / 2019-10-10
=================
  * [Deps] update `es-abstract`, `define-properties`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `covert`, `evalmd`, `object-inspect`, `safe-publish-latest`, `tape`
  * [meta] create FUNDING.yml
  * [Tests] use `npx aud` instead of `nsp` or `npm audit` with hoops
  * [Tests] up to `node` `v12.11`, `v11.15`, `v10.16`, `v9.11`, `v8.16`, `v6.17`, `v4.9`; use `nvm install-latest-npm`

1.2.1 / 2018-02-23
=================
  * [Fix] Temporarily hack main entry, so it's compatible with other resolvers (#3)
  * [Dev Deps] update `eslint`, `nsp`, `tape`
  * [Tests] up to `node` `v9.6`, `v6.13`

1.2.0 / 2018-01-18
=================
  * [New] add "auto" entry point
  * [Fix] Move the receiver length check higher
  * [Fix] spec adjustments
  * [Refactor] adjust shouldFlatten logic
  * [Dev Deps] update `eslint`
  * [Tests] up to `node` `v9.4`

1.1.1 / 2017-11-29
=================
  * [Fix] avoid an extra hole in the array (https://github.com/es-shims/Array.prototype.flatMap/issues/1)
  * [Deps] update `es-abstract`
  * [Dev Deps] update `eslint`, `nsp`
  * [Tests] up to `node` `v9.2`, `v8.9`, `v6.12`; pin included builds to LTS.

1.1.0 / 2017-10-03
=================
  * [New] add explicit setting of “length” on target array
  * [Fix] `FlattenIntoArray`: add assertion that `thisArg` and `mapperFunction` are both passed together
  * [Tests] make coverage required

1.0.1 / 2017-10-02
=================
  * Add readme

1.0.0 / 2017-10-01
=================
  * Initial release
