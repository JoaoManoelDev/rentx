import { container } from "tsyringe"

import { IDateProvider } from "../providers/DateProvider/IDateProvider"
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider"

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)
