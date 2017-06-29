var SL = SL || {};

/** Add Event Notification functions to a class.
* Tracks event handlers and notifies them when events occur.
* Usage:
* Call:
*   SL.EventNotifierMixin.call(MyClass.prototype);
* And in your constructor, call initializer with the event types you want to listen for:
*   this.EventNotifierMixinInitializer({
*     eventListeners:[
*       "myEvent1",
*       "myEvent2",
*     ]
*   });
* Then you can add handlers:
*   myClassInstance.on("myEvent1", someHandlerCallback);
* @mixin
*/
SL.EventNotifierMixin = function(props) {
  this._eventNotifierMixinId = SL.EventNotifierMixin.id++;
  this._eventNotifierMixinHandlerId = 0;

  /** Add an event handler to the handler list.
  * @param {SL.EventType} eventType The type of the event.
  * @param {Function} callback The handler to call when the specified event type occurs
  * @param {string} id Optional. An Id to reference the handler by.
  */
  this.addEventHandler = function(eventType, callback, id) {
    var handlerId = id || "eventHandler_" + this._eventNotifierMixinId + "." + this._eventNotifierMixinHandlerId;
    this._eventNotifierMixinHandlerId++;
    if (!this._eventListeners[eventType]) {
      this._eventListeners[eventType] = {};
    }
    this._eventListeners[eventType][handlerId] = callback;
    return handlerId;
  };

  /** Alias for 'add'. Add an event handler to the handler list.
  * @param {SL.EventType} eventType The type of the event.
  * @param {Function} callback The handler to call when the specified event type occurs
  * @param {string} id Optional. An Id to reference the handler by.
  */
  this.on = this.addEventHandler;

  this.removeEventHandler = function(eventHandlerId) {
    // delete
    Object.keys(this._eventListeners).forEach(function(listenerKey) {
      if (this._eventListeners[listenerKey][eventHandlerId]) delete this._eventListeners[listenerKey][eventHandlerId];
    }.bind(this));
  };

  /** Clear all event handlers for a given event type.
  * @param {SL.EventType} eventType The type of the event.
  */
  this.clearEventHandlers = function(eventType) {
    if (!this._eventListeners[eventType]) {
      throw new Error("Unknown event type:" + eventType);
    }
    this._eventListeners[eventType] = {};
  };

  /** Notify event handlers when an event has occured.
  * @param {SL.Event} event The event that occured
  */
  this.notify = function(event) {
    if (!this._eventListeners[event.type]) {
      throw new Error("Unknown event type:" + event.type);
    }
    var keys = Object.keys(this._eventListeners[event.type]);
    for (var i = 0; i < keys.length; i++) {
      if (SL.isFunction(this._eventListeners[event.type][keys[i]])) this._eventListeners[event.type][keys[i]](event);
    }
  };

  /**
  */
  this.EventNotifierMixinInitializer = function(props) {
    this._eventListeners  =  {};
    if (props.eventListeners) {
      props.eventListeners.forEach(function(eventListener) {
        this._eventListeners[eventListener] = {};
      }, this);
    }
  };

};

SL.EventNotifierMixin.id = 0;
