import { container } from "tsyringe"

import { IDateProvider } from "../providers/DateProvider/IDateProvider"
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider"

import { IMailProvider } from "./MailProvider/IMailProvider"
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider"

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)
