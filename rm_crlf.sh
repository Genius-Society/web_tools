#!/bin/bash

find "./onmp" -type f -name "*.sh" -exec sed -i 's/\r$//' {} \;