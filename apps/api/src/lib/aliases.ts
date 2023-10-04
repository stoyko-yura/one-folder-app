import path from 'path';

import 'module-alias/register';

import moduleAlias from 'module-alias';

const rootdir = path.resolve(__dirname, '..');

moduleAlias.addAlias('@/root', path.join(rootdir));
moduleAlias.addAlias('@/config', path.join(rootdir, 'config'));
moduleAlias.addAlias('@/lib', path.join(rootdir, 'lib'));
