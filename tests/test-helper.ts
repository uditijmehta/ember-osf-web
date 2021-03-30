import { setApplication } from '@ember/test-helpers';
import preloadAssets from 'ember-asset-loader/test-support/preload-assets';
import start from 'ember-exam/test-support/start';
import config from 'ember-get-config';
import Application from 'ember-osf-web/app';
import manifest from 'ember-osf-web/config/asset-manifest';
import faker from 'faker';
import 'qunit-dom';

setApplication(Application.create(config.APP) as any);

// Run tests with a seed for consistent visual diffs in Percy
faker.seed(17);

(async () => {
    // This ensures all engine resources are loaded before the tests
    await preloadAssets(manifest);

    start({
        setupTestIsolationValidation: true,
    });
})();
