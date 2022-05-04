import { info } from '@actions/core';

import { ConfigEntry, parseConfig } from './config';
import { getDiffSize, getFileSize, getPullRequest } from './pullRequest';

export default async function run(): Promise<void> {
  info('Parsing input data...');
  const configuration: ConfigEntry[] = parseConfig();
  info(`Config parsed`);

  const pullRequest = await getPullRequest();
  const size = getFileSize(configuration, pullRequest.numberOfFiles);
  info(`Level from size, ${size.label}`);
  // @ts-ignore
  const diff = getDiffSize(configuration, pullRequest.addition + pullRequest.deletions);
  info(`Level from size, ${diff.label}`);

  return undefined;
}
