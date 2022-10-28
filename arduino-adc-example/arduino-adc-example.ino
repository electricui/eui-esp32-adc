#include "electricui.h"

// Pins used in this example
//  change these as needed for your board
#define PIN_ANALOG_A A7
#define PIN_ANALOG_B A6
#define PIN_INPUT_A 4
#define PIN_INPUT_B 5
#define PIN_OUTPUT 13

#define ADC_PUSH_MS 10

// Hold samples or state information
uint16_t adc_a = 0;
uint16_t adc_b = 0;
uint16_t input_a = 0;
uint16_t input_b = 0;
uint16_t output = 0;

// Timer used to push data to UI at configured rate
uint32_t send_timestamp = 0;

char nickname[] = "ESP32 ADC Test"; 

eui_interface_t serial_comms = EUI_INTERFACE( &serial_write ); 

// Electric UI will make these variables available to the UI
eui_message_t tracked_variables[] = 
{
  EUI_CHAR_ARRAY_RO( "name", nickname ),
  EUI_UINT16_RO( "adcA", adc_a ),
  EUI_UINT16_RO( "adcB", adc_b ),

  EUI_UINT8_RO( "inA", input_a ),
  EUI_UINT8_RO( "inB", input_b ),
  
  EUI_UINT8( "out", output ),
};

void setup() 
{
  Serial.begin(115200);

  // Setup Electric UI
  eui_setup_interface( &serial_comms );
  EUI_TRACK( tracked_variables );
  eui_setup_identifier( "adc", 3 );

  // Configure the IO modes
  pinMode( PIN_ANALOG_A, INPUT );
  pinMode( PIN_ANALOG_B, INPUT );
  pinMode( PIN_INPUT_A,  INPUT_PULLUP );
  pinMode( PIN_INPUT_B,  INPUT_PULLUP );
  pinMode( PIN_OUTPUT,  OUTPUT );

  // Zero out the send timestamp
  send_timestamp = millis();
}

void loop() 
{
  // Read inbound serial data
  while( Serial.available() > 0 )  
  {  
    eui_parse( Serial.read(), &serial_comms );
  }

  // Sample the ADC and GPIO
  adc_a = analogRead( PIN_ANALOG_A );
  adc_b = analogRead( PIN_ANALOG_B );
  
  input_a = digitalRead( PIN_INPUT_A );
  input_b = digitalRead( PIN_INPUT_B );

  // Update the output GPIO
  digitalWrite( PIN_OUTPUT, output);

  // Push the adc B channel to the UI every ADC_PUSH_MS, i.e. 10ms -> 100Hz
  if( millis() - send_timestamp >= ADC_PUSH_MS )
  {
    eui_send_tracked("adcB");
    send_timestamp = millis();
  }
}

// Callback is used by the Electric UI library to send data to the UI
void serial_write( uint8_t *data, uint16_t len )
{
  Serial.write( data, len );
}
