'use strict';

// ##### OPENTELEMETRY-JS CONFIG #######
// const opentelemetry = require('@opentelemetry/api');
// const { NodeTracerProvider } = require('@opentelemetry/node');
// const { BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');
// // export to otel-collector
// const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector');
// const { B3MultiPropagator } = require('@opentelemetry/propagator-b3');

// module.exports = (serviceName) => {

//   // enables all plugins added
//   const provider = new NodeTracerProvider();
//   registerInstrumentations({
//     tracerProvider: provider
//   });

//   // enables checking for Zipkin multi header context propagation
//   opentelemetry.propagation.setGlobalPropagator(new B3MultiPropagator());

//   // export to otel-collector
//   const exporter = new CollectorTraceExporter({
//     serviceName: serviceName || 'sandbox_test_node',
//     url: `http://otel-collector.default:55681/v1/trace`,
//   });

//   provider.addSpanProcessor(new BatchSpanProcessor(exporter));

//   //  Now, register the exporter.
//   provider.register();

//   return { tracer: opentelemetry.trace.getTracer('datadogExample'), opentelemetry: opentelemetry};
// };

// ##### END OPENTELEMETRY-JS CONFIG #######

// ##### DATADOG-TRACE-JS CONFIG #######

const tracer = require('dd-trace').init({
  service: 'proxy-test',
  debug: false,
  experimental: { 
  	b3: true
  }
});


var agentUrlVFour = `http://localhost:8126/v0.4/traces`
var agentUrlVFive = `http://localhost:8126/v0.5/traces`

if (process.env.DD_AGENT_HOST) {
  agentUrlVFour = `http://${process.env.DD_AGENT_HOST}:8126/v0.4/traces`
  agentUrlVFive = `http://${process.env.DD_AGENT_HOST}:8126/v0.5/traces`
}

tracer.use('http', {
  blocklist: [agentUrlVFour, agentUrlVFive]
})

module.exports = tracer

// ##### END DATADOG-TRACE-JS CONFIG #######