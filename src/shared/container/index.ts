import { container } from 'tsyringe';

import ILogRepository from '@modules/log/repositories/ILogRepository';
import LogRepository from '@modules/log/infra/typeorm/repositories/LogRepository';

import StorageProvider from '@shared/container/providers/StorageProvider/implementations/StorageProvider'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

container.registerSingleton<ILogRepository>('LogRepository', LogRepository);

container.registerSingleton<IStorageProvider>('StorageProvider', StorageProvider);
