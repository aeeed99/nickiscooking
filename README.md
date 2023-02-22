
## Building the site

There are additional steps before hugo.

### SPA Content

**scripts/components** contains solidJS components, which are embedded in different
static html pages. See [Components README](./scripts/components/README.md) for full setup info.

Run:

```
projectroot/scripts/components $ npm run build
```

### Recipe Content

**scripts/server/** contains pipenv files builds all content md files from data/recipes. Must run _before_ running a hugo server,
and especially before deploying.

With [pipenv](https://pipenv.pypa.io/en/latest/) set up, run:
```
projectroot/scripts/server $ pipenv run build
```

This will also build hugo and add (pagefind)[pagefind.app].