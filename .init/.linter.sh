#!/bin/bash
cd /home/kavia/workspace/code-generation/flow-chemistry-workflow-builder-1462-1471/frontend_flow_chemistry_form
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

