import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import Ember from 'ember';

const { Logger } = Ember;

/**
 * @module ember-osf-web
 * @submodule mixins
 */

/**
 * Route mixin for login based on OSF cookie authentication. Intended to be used in tandem with
 * OsfCookieLoginController mixin.
 * This auth method is not available to third-party applications.
 *
 * @class OsfCookieLoginRoute
 * @extends Ember.Mixin
 * @uses ember-simple-auth/UnauthenticatedRouteMixin
 */
export default Mixin.create({
    session: service(),

    async beforeModel(transition) {
        // Determine whether the user is logged in by making a test request. This is quite a crude way of
        // determining whether the user has a cookie and should be improved in the future.

        await this._super(transition);

        if (this.get('session.isAuthenticated')) {
            return;
        }

        // Block transition until auth attempt resolves. If auth fails, let the page load normally.
        try {
            return await this.get('session').authenticate('authenticator:osf-cookie');
        } catch (e) {
            Logger.log('Authentication failed: ', e);
        }
    },
});
