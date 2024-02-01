import path from 'path';

import 'module-alias/register';

import moduleAlias from 'module-alias';

const rootdir = path.resolve(__dirname, '..');

moduleAlias.addAlias('@/root', path.join(rootdir));
moduleAlias.addAlias('@/config', path.join(rootdir, 'config'));
moduleAlias.addAlias('@/libs', path.join(rootdir, 'libs'));
moduleAlias.addAlias('@/controllers', path.join(rootdir, 'controllers'));
moduleAlias.addAlias('@/services', path.join(rootdir, 'services'));
moduleAlias.addAlias('@/middleware', path.join(rootdir, 'middleware'));
moduleAlias.addAlias('@/routes', path.join(rootdir, 'routes'));
moduleAlias.addAlias('@/utils', path.join(rootdir, 'utils'));
